export const Select = (props) => {
  return (
    <select
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary focus:shadow-md"
      {...props}
    >
      {props.children}
    </select>
  );
};
