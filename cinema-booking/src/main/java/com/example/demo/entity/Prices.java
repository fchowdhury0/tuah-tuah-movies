
package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prices")
public class Prices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "adult_price", nullable = false)
    private Double adult;

    @Column(name = "child_price", nullable = false)
    private Double child;

    @Column(name = "senior_price", nullable = false)
    private Double senior;

    public Double getAdult() {

        return adult;

    }



    public void setAdult(Double adult) {

        this.adult = adult;

    }



    public Double getChild() {

        return child;

    }



    public void setChild(Double child) {

        this.child = child;

    }



    public Double getSenior() {

        return senior;

    }



    public void setSenior(Double senior) {

        this.senior = senior;

    }
}
