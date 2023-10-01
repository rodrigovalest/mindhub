export default function InputType({ type, fieldName, register, error }) {
  return (
    <div className="w-full pb-5">
      <label className="w-full pb-2 block text-white font-medium first-letter:uppercase">
        {fieldName}
      </label>
      <input
        type={type}
        className="w-full h-9 border-indigo-600 border-2 rounded bg-base text-white pl-1 font-light"
        {...register(fieldName)}
        autoComplete="off"
        autoCorrect="off"
      />
      <p className="text-red-500 text-sm mt-1 first-letter:uppercase">
        {error && error.message}
      </p>
    </div>
  )
}
