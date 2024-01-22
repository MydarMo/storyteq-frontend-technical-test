import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getData from '../../api';
import { setError, setLoading, setVehicles } from '../../redux/actions';

export default function useData() {
  const dispatch = useDispatch();

  useEffect(() => {
    getData()
      .then((response) => dispatch(setVehicles(response)))
      .catch((err) => dispatch(setError(err)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);
}
