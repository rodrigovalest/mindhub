export default function InputText({ text }) {
  return (
    <div className="w-full pb-5">
      <label className="w-full pb-2 block text-white font-medium">{text}</label>
      <input className="w-full h-9 border-indigo-600 border-2 rounded bg-base" />
    </div>
  )
}
