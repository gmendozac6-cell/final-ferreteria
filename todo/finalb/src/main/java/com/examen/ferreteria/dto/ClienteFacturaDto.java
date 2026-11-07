package com.examen.ferreteria.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ClienteFacturaDto {
    private String nombre;
    private String apellido;
    private String nit;
    private Date fechaFactura;
    private BigDecimal total;

    public ClienteFacturaDto(String nombre, String apellido, String nit, Date fechaFactura, BigDecimal total) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nit = nit;
        this.fechaFactura = fechaFactura;
        this.total = total;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getNit() { return nit; }
    public void setNit(String nit) { this.nit = nit; }

    public Date getFechaFactura() { return fechaFactura; }
    public void setFechaFactura(Date fechaFactura) { this.fechaFactura = fechaFactura; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}