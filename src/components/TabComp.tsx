/* eslint-disable @typescript-eslint/no-explicit-any */
const Tabs = [
  { id: 1, name: "User Profile" },
  // { id: 2, name: "Medical History" },
  { id: 3, name: "Next of kin" },
  { id: 4, name: "Password Reset" },
];

export function Component({ handleActive, active = 1 }: any) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {Tabs.map((d) => (
          <li key={d.id} className="md:mr-2" onClick={() => handleActive(d.id)}>
            <a
              href="#"
              className={` ${
                d.id === active ? "border-primary-dark" : "border-transparent"
              } inline-block px-2 py-4 md:p-4 border-b-2  rounded-t-lg`}>
              {d.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
