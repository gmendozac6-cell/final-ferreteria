package com.examen.ferreteria.service;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteFacturaDto> obtenerReporteClienteFactura() {
        return clienteRepository.obtenerReporteClienteFactura();
    }
}