package com.examen.ferreteria.service;

import com.examen.ferreteria.dto.ArticuloCategoriaDto;
import com.examen.ferreteria.entity.Articulo;
import com.examen.ferreteria.repository.ArticuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository articuloRepository;

    public List<Articulo> buscarActivosPorNombre(String nombre) {
        return articuloRepository.buscarActivosPorNombre(nombre);
    }

    public List<ArticuloCategoriaDto> obtenerReporteArticuloCategoria() {
        return articuloRepository.obtenerReporteArticuloCategoria();
    }
}