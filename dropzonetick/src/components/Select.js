export const Select = ({
  onChange,
  value,
  data,
  firstOption,
  disabled,
  isGrade,
}) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary focus:shadow-md"
      disabled={disabled}
    >
      <option value="" disabled hidden>
        {firstOption}
      </option>
      {data.map((data) => (
        <option key={data} value={data}>
          {isGrade ? "V" + data : data}
        </option>
      ))}
    </select>
  );
};
