export default function FullScreenLoader() {
  return (
    <section className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <div className="fas fa-circle-notch fa-spin fa-5x text-blue-600"></div>
      </div>
    </section>
  );
}
