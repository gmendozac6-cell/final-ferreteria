package com.examen.ferreteria.controller;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/reporteClienteFactura")
    public List<ClienteFacturaDto> reporteClienteFactura() {
        return clienteService.obtenerReporteClienteFactura();
    }
}