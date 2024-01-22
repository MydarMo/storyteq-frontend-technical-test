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
  const data = await response.json();

  // map through the list of vehicles to access the apiUrl for each vehicle to return the list of only successful APIs
  const vehicleData = await Promise.allSettled(
    data.map(async (res) => (await fetch(res.apiUrl)).json())
  );

  // merge both data and vehicleData to form a complete json object for each car, excluding unfilfilled response and vehicles without price
  const vehicles = [];

  for (let i = 0; i < data.length; i + 1) {
    if (
      vehicleData[i].status === 'fulfilled'
            && vehicleData[i].value.price
    ) {
      vehicles.push({ ...data[i], ...vehicleData[i].value });
    }
  }

  return vehicles;
}
