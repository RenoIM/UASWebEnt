interface Mahasiswa {
  nim: string;
  name: string;
  gender: string;
  birth_date: string;
  address: string;
  contact: string;
  status: number;
}

export default function MahasiswaTable({
  mahasiswa,
  onEdit,
  onDelete,
  onDetail,
}: {
  mahasiswa: Mahasiswa[];
  onEdit: (data: Mahasiswa) => void;
  onDelete: (nim: string) => void;
  onDetail: (data: Mahasiswa) => void;
}) {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col mb-6 bg-white dark:bg-slate-850 shadow-xl rounded-2xl">
          <div className="p-6 border-b dark:border-white/40">
            <h6 className="dark:text-white">List Mahasiswa (NIM & Nama)</h6>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-slate-500 dark:text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase border-b dark:border-white/40">NIM</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase border-b dark:border-white/40">Name</th>
                  <th className="px-6 py-3 text-center text-xs font-bold uppercase border-b dark:border-white/40">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.map((m) => (
                  <tr key={m.nim}>
                    <td className="px-6 py-3 border-b dark:border-white/40">{m.nim}</td>
                    <td className="px-6 py-3 border-b dark:border-white/40">{m.name}</td>
                    <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap">
                        <button
                          onClick={() => onDetail(m)}
                          className="p-2 border-b dark:border-black/40 mr-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => onEdit(m)}
                          className="p-2 border-b dark:border-black/40 mr-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(m.nim)}
                          className="p-2 border-b dark:border-black/40 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline">
                         Hapus </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
