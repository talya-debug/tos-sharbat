import Icon from './Icon';

export default function CameraFab() {
  return (
    <button className="fixed bottom-8 left-8 w-14 h-14 bg-action-blue text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
      <Icon name="add" size={32} />
    </button>
  );
}
