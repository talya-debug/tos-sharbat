import Icon from './Icon';

export default function CameraFab() {
  return (
    <button className="fixed bottom-20 left-4 z-50 w-14 h-14 rounded-full bg-secondary-container text-on-secondary shadow-lg flex items-center justify-center hover:brightness-110 transition-all active:scale-95">
      <Icon name="photo_camera" fill size={24} />
    </button>
  );
}
