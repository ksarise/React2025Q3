import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { handleTrackInfo } from '../../services/dataService';
import type { TrackDetails as TrackDetailsType } from '../../types';

const TrackDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const detailId = searchParams.get('details');

  const [detail, setDetail] = useState<TrackDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!detailId) return;

    const [artist, track] = decodeURIComponent(detailId).split('___');
    if (!artist || !track) return;

    (async () => {
      setLoading(true);
      try {
        const data = await handleTrackInfo(artist, track);
        setDetail(data);
      } catch (error) {
        console.error('Failed to fetch track details:', error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [detailId]);

  const handleClose = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.delete('details');
    navigate(`?${currentParams.toString()}`, { replace: true });
  };

  if (loading) return <Loader />;
  if (!detail) return <div className="p-6">Track not found.</div>;

  return (
    <div className="p-6 relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        Close X
      </button>
      <h2 className="text-xl font-bold mb-4">{detail.name}</h2>
      <p>
        <strong>Artist:</strong> {detail.artist.name}
      </p>
      <p>
        <strong>Album:</strong> {detail.album?.title || '—'}
      </p>
      <p>
        <strong>Published:</strong> {detail.wiki?.published || '—'}
      </p>
      <p>
        <strong>Listeners:</strong> {detail.listeners || '—'}
      </p>
      <p>
        <strong>Playcount:</strong> {detail.playcount || '—'}
      </p>
    </div>
  );
};

export default TrackDetails;
