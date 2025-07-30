interface Mahasiswa {
  nim: string;
  name: string;
  gender: string;
  birth_date: string;
  address: string;
  contact: string;
  status: number;
}

export default function MahasiswaDetail({
  data,
  onClose,
}: {
  data: Mahasiswa;
  onClose: () => void;
}) {
  return (
    <div className="fixed h-full w-full z-50 flex items-center justify-center bg-opacity-50">
      <div className="flex-none w-full max-w-md px-3">
        <div className="relative flex flex-col bg-white dark:bg-slate-850 shadow-xl rounded-2xl">
          <div className="p-6 border-b dark:border-white/40 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-white">Detail Mahasiswa</h2>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-white hover:text-red-600 text-xl"
            >
              ×
            </button>
          </div>
          <div className="p-6 text-sm text-slate-700 dark:text-white space-y-2">
            <p><strong>NIM:</strong> {data.nim}</p>
            <p><strong>Nama:</strong> {data.name}</p>
            <p><strong>Jenis Kelamin:</strong> {data.gender}</p>
            <p><strong>Tanggal Lahir:</strong> {data.birth_date}</p>
            <p><strong>Alamat:</strong> {data.address}</p>
            <p><strong>Kontak:</strong> {data.contact}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={data.status === 1 ? "text-green-600" : "text-red-600"}>
                {data.status === 1 ? "Aktif" : "Non-Aktif"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
