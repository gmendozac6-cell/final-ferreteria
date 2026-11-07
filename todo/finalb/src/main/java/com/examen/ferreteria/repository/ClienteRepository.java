package com.examen.ferreteria.repository;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query("SELECT new com.examen.ferreteria.dto.ClienteFacturaDto(c.nombre, c.apellido, c.nit, f.fechaFactura, f.total) " +
           "FROM Factura f JOIN f.idCliente c " +
           "WHERE f.estado = true " +
           "ORDER BY f.fechaFactura ASC")
    List<ClienteFacturaDto> obtenerReporteClienteFactura();
}