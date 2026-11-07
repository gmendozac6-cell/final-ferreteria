import React, { useState, useRef } from 'react';
import type { Articulo, ArticuloCategoriaDto, ClienteFacturaDto } from '../types/reportes';
import { exportarTablaPDF, exportarTablaExcel } from '../utils/exportUtils';

const BASE_URL = 'http://localhost:8080';

export const Reportes: React.FC = () => {
  const [filtroNombre, setFiltroNombre] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const abrirDialogFiltro = () => {
    setFiltroNombre('');
    dialogRef.current?.showModal();
  };

  const cerrarDialogFiltro = () => {
    dialogRef.current?.close();
  };

  const obtenerArticulosFiltrados = async (): Promise<Articulo[]> => {
    const res = await fetch(`${BASE_URL}/articulos/mostrarActivosFiltro?nombre=${encodeURIComponent(filtroNombre)}`);
    return await res.json();
  };

  const exportarReporte1PDF = async () => {
    const data = await obtenerArticulosFiltrados();
    const cols = ['ID', 'Nombre', 'Marca', 'Precio (Q)', 'Stock'];
    const rows = data.map((art) => [
      art.idArticulo,
      art.nombre,
      art.marca,
      `Q${Number(art.precio).toFixed(2)}`,
      art.stock
    ]);
    exportarTablaPDF(`Reporte de Artículos (Filtro: "${filtroNombre}")`, cols, rows, 'Reporte_Articulos_Filtro');
    cerrarDialogFiltro();
  };

  const exportarReporte1Excel = async () => {
    const data = await obtenerArticulosFiltrados();
    const cols = ['ID', 'Nombre', 'Marca', 'Precio', 'Stock'];
    const rows = data.map((art) => [
      art.idArticulo,
      art.nombre,
      art.marca,
      Number(art.precio),
      art.stock
    ]);
    await exportarTablaExcel(`Reporte de Artículos (Filtro: "${filtroNombre}")`, cols, rows, 'Reporte_Articulos_Filtro');
    cerrarDialogFiltro();
  };

  const obtenerArticulosCategoria = async (): Promise<ArticuloCategoriaDto[]> => {
    const res = await fetch(`${BASE_URL}/articulos/reporteArticulocategoria`);
    return await res.json();
  };

  const exportarReporte2PDF = async () => {
    const data = await obtenerArticulosCategoria();
    const cols = ['Categoría', 'Artículo', 'Marca', 'Precio (Q)', 'Stock'];
    const rows = data.map((item) => [
      item.nombreCategoria,
      item.nombreArticulo,
      item.marca,
      `Q${Number(item.precio).toFixed(2)}`,
      item.stock
    ]);
    exportarTablaPDF('Reporte de Artículos por Categoría', cols, rows, 'Reporte_Articulos_Categoria');
  };

  const exportarReporte2Excel = async () => {
    const data = await obtenerArticulosCategoria();
    const cols = ['Categoría', 'Artículo', 'Marca', 'Precio', 'Stock'];
    const rows = data.map((item) => [
      item.nombreCategoria,
      item.nombreArticulo,
      item.marca,
      Number(item.precio),
      item.stock
    ]);
    await exportarTablaExcel('Reporte de Artículos por Categoría', cols, rows, 'Reporte_Articulos_Categoria');
  };

  const obtenerClientesFacturas = async (): Promise<ClienteFacturaDto[]> => {
    const res = await fetch(`${BASE_URL}/clientes/reporteClienteFactura`);
    return await res.json();
  };

  const exportarReporte3PDF = async () => {
    const data = await obtenerClientesFacturas();
    const cols = ['Cliente (Nombre y Apellido)', 'NIT', 'Fecha Factura', 'Total (Q)'];
    const rows = data.map((item) => [
      `${item.nombre} ${item.apellido}`,
      item.nit,
      new Date(item.fechaFactura).toLocaleString('es-GT'),
      `Q${Number(item.total).toFixed(2)}`
    ]);
    exportarTablaPDF('Reporte de Facturas por Cliente', cols, rows, 'Reporte_Facturas_Cliente');
  };

  const exportarReporte3Excel = async () => {
    const data = await obtenerClientesFacturas();
    const cols = ['Cliente (Nombre y Apellido)', 'NIT', 'Fecha Factura', 'Total'];
    const rows = data.map((item) => [
      `${item.nombre} ${item.apellido}`,
      item.nit,
      new Date(item.fechaFactura).toLocaleString('es-GT'),
      Number(item.total).toFixed(2)
    ]);
    await exportarTablaExcel('Reporte de Facturas por Cliente', cols, rows, 'Reporte_Facturas_Cliente');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Módulo de Reportes - Ferretería</h1>
      <p>Selecciona la opción deseada para generar la descarga en PDF o Excel.</p>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>1. Artículos por Nombre</h3>
          <p>Filtrar por texto con ventana emergente dialog.</p>
          <button onClick={abrirDialogFiltro} style={{ padding: '8px 14px', cursor: 'pointer' }}>
            Abrir Filtro
          </button>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>2. Artículos con su Categoría</h3>
          <p>Ordenados por categoría y nombre del artículo.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={exportarReporte2PDF} style={{ padding: '8px 12px', cursor: 'pointer' }}>PDF</button>
            <button onClick={exportarReporte2Excel} style={{ padding: '8px 12px', cursor: 'pointer' }}>Excel</button>
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>3. Facturas por Cliente</h3>
          <p>Nombre y apellido juntos, totales con 2 decimales.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={exportarReporte3PDF} style={{ padding: '8px 12px', cursor: 'pointer' }}>PDF</button>
            <button onClick={exportarReporte3Excel} style={{ padding: '8px 12px', cursor: 'pointer' }}>Excel</button>
          </div>
        </div>
      </div>

      <dialog ref={dialogRef} style={{ padding: '25px', borderRadius: '8px', border: '1px solid #444', width: '350px' }}>
        <h3>Filtrar Artículos por Nombre</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            placeholder="Ingrese nombre..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={exportarReporte1PDF} style={{ padding: '8px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Exportar PDF
          </button>
          <button onClick={exportarReporte1Excel} style={{ padding: '8px 12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Exportar Excel
          </button>
          <button onClick={cerrarDialogFiltro} style={{ padding: '8px 12px', backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        </div>
      </dialog>
    </div>
  );
};