// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  // fetch the list of vehicles
  const response = await fetch('/api/vehicles.json');
  if (!response.ok) {
    // Handle HTTP error
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  // map through the list of vehicles to access the apiUrl to return json
  const resolvedData = await Promise.allSettled(
    data.map(async (res) => (await fetch(res.apiUrl)).json())
  );

  // filter through the list of apiUrl data to return all sucessfully fulfilled data
  const fulfilledData = resolvedData.filter(
    (resolve) => resolve.status !== 'rejected'
  );

  // filter through the fulfilled list to remove vehicles without price
  const vehiclesWithPrice = fulfilledData.filter(
    (fulfilled) => fulfilled.value.price
  );

  // merge the initial data and the vehicles with price to return complete object
  const vehicles = vehiclesWithPrice.map((vehicle) => {
    const initialData = data.find(
      (initial) => initial.id === vehicle.value.id
    );
    return {
      ...initialData,
      ...vehicle.value,
    };
  });

  return vehicles;
}
