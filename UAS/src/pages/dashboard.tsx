import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import MahasiswaForm from "../components/MahasiswaForm";
import MahasiswaTable from "../components/MahasiswaTable";
import MahasiswaDetail from "../components/MahasiswaDetail";

interface Mahasiswa {
  nim: string;
  name: string;
  gender: string;
  birth_date: string;
  address: string;
  contact: string;
  status: number;
}

export default function Dashboard() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [editData, setEditData] = useState<Mahasiswa | null>(null);
  const [detailData, setDetailData] = useState<Mahasiswa | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMahasiswa = async () => {
    const { data, error } = await supabase.from("mahasiswa").select("*");
    if (error) {
      console.error("Fetch error:", error.message);
      return;
    }
    if (data) setMahasiswa(data);
  };

  const handleDelete = async (nim: string) => {
    const { error } = await supabase.from("mahasiswa").delete().eq("nim", nim);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      fetchMahasiswa();
    }
  };

  const handleEdit = (data: Mahasiswa) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditData(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  return (
    <>
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md w-full max-w-md relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-slate-600 dark:text-white hover:text-red-600"
            >
              ✕
            </button>
            <MahasiswaForm
              fetchMahasiswa={fetchMahasiswa}
              editData={editData}
              clearEdit={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {detailData && (
        <MahasiswaDetail data={detailData} onClose={() => setDetailData(null)} />
      )}

      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
        {/* Sidebar */}
        <aside className="w-64 p-4 my-4 ml-4 bg-white dark:bg-slate-850 shadow-xl rounded-2xl h-fit">
          <div className="mb-6">
            <a className="block text-lg font-bold text-slate-700 dark:text-white">
              Admin Dashboard
            </a>
          </div>
          <hr className="mb-4 border-gray-300 dark:border-white/40" />
          <ul className="space-y-2">
            <li className="mt-0.5 w-full">
              <a
                className="py-2.5 bg-blue-500/13 dark:text-white text-sm font-semibold mx-2 flex items-center whitespace-nowrap rounded-lg px-4 transition-colors"
                href="#"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-blue-500">
                  <i className="ni ni-tv-2" />
                </div>
                <span className="ml-1">List Mahasiswa</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            Dashboard Halaman Mahasiswa
          </h1>

          {/* Tombol Tambah Mahasiswa */}
          <div className="mb-6">
            <button
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-gray px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Tambah Mahasiswa
            </button>
          </div>

          {/* Tabel Mahasiswa */}
          <MahasiswaTable
            mahasiswa={mahasiswa}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDetail={setDetailData}
          />
        </main>
      </div>
    </>
  );
}
