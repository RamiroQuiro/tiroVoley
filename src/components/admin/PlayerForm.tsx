import React, { useState } from 'react';

interface Player {
  id?: number;
  nombre: string;
  posicion: string;
  fotoURL: string | null;
  metaPersonal: number;
  historia: string | null;
  destacado: boolean;
  recaudado?: number;
}

interface PlayerFormProps {
  initialData?: Player;
  isEditing?: boolean;
}

export default function PlayerForm({ initialData, isEditing = false }: PlayerFormProps) {
  const [formData, setFormData] = useState<Player>(initialData || {
    nombre: '',
    posicion: '',
    fotoURL: '',
    metaPersonal: 200000,
    historia: '',
    destacado: false,
    recaudado: 0
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEditing ? `/api/players/${formData.id}` : '/api/players';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        window.location.href = '/admin/jugadores';
      } else {
        alert('Error al guardar');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="input-field w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
          <select name="posicion" value={formData.posicion} onChange={handleChange} className="input-field w-full border p-2 rounded">
            <option value="">Seleccionar...</option>
            <option value="Armador">Armador</option>
            <option value="Punta">Punta</option>
            <option value="Central">Central</option>
            <option value="Opuesto">Opuesto</option>
            <option value="Libero">Libero</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Personal ($)</label>
          <input required type="number" name="metaPersonal" value={formData.metaPersonal} onChange={handleChange} className="input-field w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto URL</label>
          <input type="url" name="fotoURL" value={formData.fotoURL || ''} onChange={handleChange} className="input-field w-full border p-2 rounded" placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Historia / Bio</label>
        <textarea name="historia" rows={4} value={formData.historia || ''} onChange={handleChange} className="input-field w-full border p-2 rounded"></textarea>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="destacado" name="destacado" checked={formData.destacado} onChange={handleChange} className="w-4 h-4 text-brand-orange" />
        <label htmlFor="destacado" className="text-sm text-gray-700">Destacar en Home Page</label>
      </div>

      <div className="pt-4 border-t flex justify-end gap-4">
        <a href="/admin/jugadores" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</a>
        <button type="submit" disabled={saving} className="px-6 py-2 bg-brand-dark text-white rounded hover:bg-black disabled:opacity-50">
          {saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
}
