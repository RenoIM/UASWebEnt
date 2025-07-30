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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 w-full max-w-md relative space-y-4">
        <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-600 dark:text-white hover:text-red-600 text-xl"> X
        </button>
        <h2 className="text-xl font-semibold text-slate-700 dark:text-white">Detail Mahasiswa</h2>
        <div className="space-y-3 text-sm dark:text-white items-center">
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

  );
}
