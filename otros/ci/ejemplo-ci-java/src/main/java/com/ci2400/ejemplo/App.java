package com.ci2400.ejemplo;

/**
 * Hello world!
 *
 */
public class App
{
    public static void main( String[] args ){
        int num1 = 100;
        int num2 = 5;
        Calculadora calculadora = new Calculadora();
        System.out.println("Suma: " + calculadora.sumar(num1, num2));
        System.out.println("Resta: " + calculadora.restar(num1, num2));
        System.out.println("Multiplicacion: " + calculadora.multiplicar(num1, num2));
        System.out.println("Division: " + calculadora.dividir(num1, num2));
    }
}
