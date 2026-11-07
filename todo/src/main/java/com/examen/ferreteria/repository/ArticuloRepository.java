package com.examen.ferreteria.repository;

import com.examen.ferreteria.dto.ArticuloCategoriaDto;
import com.examen.ferreteria.entity.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Integer> {

    @Query("SELECT a FROM Articulo a WHERE a.estado = true AND LOWER(a.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Articulo> buscarActivosPorNombre(@Param("nombre") String nombre);

    @Query("SELECT new com.examen.ferreteria.dto.ArticuloCategoriaDto(a.nombre, a.marca, c.nombre, a.precio, a.stock) " +
           "FROM Articulo a JOIN a.idCategoria c " +
           "WHERE a.estado = true " +
           "ORDER BY c.nombre ASC, a.nombre ASC")
    List<ArticuloCategoriaDto> obtenerReporteArticuloCategoria();
}