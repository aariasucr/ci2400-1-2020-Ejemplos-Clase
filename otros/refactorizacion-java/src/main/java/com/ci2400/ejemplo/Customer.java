package com.ci2400.ejemplo;


import java.util.ArrayList;
import java.util.List;

public class Customer {
  private String name;
  private List<Rental> myRentals = new ArrayList<Rental>();

  public Customer(String name) {
    this.name = name;
  }

  public void addRental(Rental rental) {
    myRentals.add(rental);
  }

  public String getName() {
    return name;
  }

  public String generateStatement() {
    double totalAmount = 0;
    int frequentRenterPoints = 0;
    StringBuilder statementResult = new StringBuilder();
    statementResult.append("Rental Record for ").append(getName()).append("\n");

    for(Rental each : myRentals){
      double thisAmount = 0;

      // determines the amount for each line
      switch (each.getMovie().getPriceCode()) {
        case Movie.REGULAR:
          thisAmount += 2;
          if (each.getDaysRented() > 2)
            thisAmount += (each.getDaysRented() - 2) * 1.5;
          break;
        case Movie.NEW_RELEASE:
          thisAmount += each.getDaysRented() * 3;
          break;
        case Movie.CHILDRENS:
          thisAmount += 1.5;
          if (each.getDaysRented() > 3)
            thisAmount += (each.getDaysRented() - 3) * 1.5;
          break;
        default:
          throw new RuntimeException("Movie case [" + each.getMovie().getPriceCode() + "] not implemented");
      }

      frequentRenterPoints++;

      if (each.getMovie().getPriceCode() == Movie.NEW_RELEASE
        && each.getDaysRented() > 1)
        frequentRenterPoints++;

      statementResult.append("\t").append(each.getMovie().getTitle()).append("\t").append(thisAmount).append("\n");

      totalAmount += thisAmount;

    }
    statementResult.append("You owed ").append(totalAmount).append("\n");
    statementResult.append("You earned ").append(frequentRenterPoints).append(" frequent renter points\n");


    return statementResult.toString();
  }
}