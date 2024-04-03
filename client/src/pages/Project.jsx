import CallToAction from "../components/CallToAction";

export default function Project() {
  return (
    <div className="min-h-screen justify-center items-center flex">
      <div className="max-w-2xl flex flex-col  gap-6 justify-center items-center">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Build fun and engaging projects while learning HTML, CSS, and
          JavaScript!
        </p>
        <div>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
