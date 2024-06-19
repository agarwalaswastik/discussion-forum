export default function LoadingOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-white bg-opacity-15">
      <div className="border-accent h-20 w-20 animate-spin rounded-full border-l-4 border-t-4"></div>
    </div>
  );
}
