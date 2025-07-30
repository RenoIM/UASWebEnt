import { useState, useEffect } from "react";
import supabase from '../utils/supabase.ts';

interface Mahasiswa {
  nim?: string;
  name: string;
  gender: string;
  birth_date: string;
  address: string;
  contact: string;
  status: number;
}

export default function MahasiswaForm({
  fetchMahasiswa,
  editData,
  clearEdit,
}: {
  fetchMahasiswa: () => void;
  editData: Mahasiswa | null;
  clearEdit: () => void;
}) {
  const [formData, setFormData] = useState<Mahasiswa>({
    nim: "",
    name: "",
    gender: "",
    birth_date: "",
    address: "",
    contact: "",
    status: 1,
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "status" ? +value : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      await supabase.from("mahasiswa").update(formData).eq("nim", editData.nim);
      clearEdit();
    } else {
      await supabase.from("mahasiswa").insert([formData]);
    }
    fetchMahasiswa();
    setFormData({
      nim: "",
      name: "",
      gender: "",
      birth_date: "",
      address: "",
      contact: "",
      status: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark: rounded-xl space-y-4 w-full max-w-md">
      <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
        {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
      </h2>

      {!editData && (
        <div>
          <label htmlFor="nim" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NIM</label>
          <input
            id="nim"
            name="nim"
            type="text"
            value={formData.nim}
            onChange={handleChange}
            placeholder="NIM"
            required
            className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        >
          <option value="">Pilih Gender</option>
          <option value="Laki-Laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <div>
        <label htmlFor="birth_date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir</label>
        <input
          id="birth_date"
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kontak</label>
        <input
          id="contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Phone / Email"
          required
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        >
          <option value={1}>Aktif</option>
          <option value={0}>Non-Aktif</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-gray py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {editData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
