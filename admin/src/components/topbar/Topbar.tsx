export default function Topbar() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="font-semibold text-xl">
        Dashboard
      </h2>

      <div className="font-medium">
        {user.name}
      </div>

    </div>
  );
}