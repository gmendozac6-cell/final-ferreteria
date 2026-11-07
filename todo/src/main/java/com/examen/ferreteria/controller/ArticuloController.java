package com.examen.ferreteria.controller;

import com.examen.ferreteria.dto.ArticuloCategoriaDto;
import com.examen.ferreteria.entity.Articulo;
import com.examen.ferreteria.service.ArticuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articulos")
@CrossOrigin(origins = "*")
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @GetMapping("/mostrarActivosFiltro")
    public List<Articulo> mostrarActivosFiltro(@RequestParam(value = "nombre", defaultValue = "") String nombre) {
        return articuloService.buscarActivosPorNombre(nombre);
    }

    @GetMapping("/reporteArticulocategoria")
    public List<ArticuloCategoriaDto> reporteArticuloCategoria() {
        return articuloService.obtenerReporteArticuloCategoria();
    }
}