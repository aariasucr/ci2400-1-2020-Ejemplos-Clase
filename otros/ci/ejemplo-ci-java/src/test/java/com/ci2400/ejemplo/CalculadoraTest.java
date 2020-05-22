package com.ci2400.ejemplo;

import junit.framework.TestCase;

public class CalculadoraTest extends TestCase {
  private Calculadora calculadora;
  int num1 = 10;
  int num2 = 5;

  public CalculadoraTest(String testName){
    super(testName);
    this.calculadora = new Calculadora();
  }

  public void testSumar() {
    int result = calculadora.sumar(num1, num2);
    assertEquals(15, result);
  }

  public void testRestar() {
    int result = calculadora.restar(num1, num2);
    assertEquals(5, result);
  }

  public void testMultiplicar() {
    int result = calculadora.multiplicar(num1, num2);
    assertEquals(50, result);
  }

  public void testDividir() {
    int result = calculadora.dividir(num1, num2);
    assertEquals(2, result);
  }
}
