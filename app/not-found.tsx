export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex items-center">
        <h1 className="border-r border-black/30 pr-6 text-2xl font-medium leading-[49px] dark:border-white/30">
          404
        </h1>
        <h2 className="ml-6 text-sm font-normal leading-[49px]">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
}
