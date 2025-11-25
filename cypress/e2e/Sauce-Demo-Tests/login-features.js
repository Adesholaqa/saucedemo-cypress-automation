/// <reference types="Cypress"/>

describe('Validate login', () => {
    it('Validate login with the valid input', () => {
       cy.visit("https://www.saucedemo.com/") 
       cy.get("#user-name").type("standard_user");
       cy.get("#password").type("secret_sauce");
       cy.get("#login-button").click();
       cy.url().should("include" , "inventory.html");
       cy.reload();
       cy.go("back");
    });

    it("Validate login with invalid input", ()=>{
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("Standard.User");
        cy.get("#password").type("Secret.Sauce");
        cy.get("#login-button").click();
        cy.get('[data-test="error"]').invoke("text").should("include","Epic sadface: Username and password do not match any user in this service");
    })

    it("validate login with empty field", ()=>{
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name")
        cy.get("#password")
        cy.get("#login-button").click();
        cy.get('[data-test="error"]').invoke("text").should("include","Epic sadface: Username is required");
    })

    it("Validate logout workflow", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");  
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
    });

    it("iterate over the element on the landing page and click one to add to the cart", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get(".inventory_item_label .inventory_item_name").each(($el,index,$list)=>{
        if($el.text().includes("Sauce Labs Backpack")){
            cy.wrap($el).click()
        }
      })
    })
    
    it("iterate over the element to counbt the total product in the landing page",()=>{
       cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html"); 
      cy.get(".inventory_item_label .inventory_item_name").each(($el,index,$list)=>{
        cy.log('index:',+ index + ':' + $el.text())
      })
    })
    
    it("add an item to cart", ()=>{
       cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html"); 
      cy.get(".inventory_item_label .inventory_item_name").each(($el,index,$list)=>{
        if($el.text().includes("Sauce Labs Backpack")){
            cy.wrap($el).click()
        }
      })
      cy.url().should('include', 'inventory-item.html?id=4')
      cy.get('button[id="add-to-cart"]').click(); // #add-to-cart 
      cy.get('button[id="remove"]').click()       //#remove
    })

    it("check the price of each item", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get(".inventory_item_price").as("itemPrice")
      cy.get("@itemPrice").each(($el,index,$list)=>{
        cy.log($el.text())
      })
    })

    it("counting the item inside the cart", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");  ///id="#add-to-cart-sauce-labs-backpack"
      cy.get("#add-to-cart-sauce-labs-backpack").click()
      cy.get(".shopping_cart_link").click()
      cy.get(".shopping_cart_link").should("contain", "1")
      cy.go("back")
      cy.url().should("include" , "inventory.html");
    })

    it("counting the item inside the cart2", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get("#add-to-cart-sauce-labs-backpack").click()
      cy.get("#add-to-cart-sauce-labs-bike-light").click()
      cy.get(".shopping_cart_link").click()
      cy.get(".shopping_cart_link").should("contain", "2")
      cy.go("back")
      cy.url().should("include" , "inventory.html");
      cy.get("#remove-sauce-labs-backpack").click()   
      cy.get("#remove-sauce-labs-bike-light").click()
    })

    it("confirming the product inside the cart by name of the product", ()=>{
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce"); 
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get("#add-to-cart-sauce-labs-backpack").click()
      cy.get("#add-to-cart-sauce-labs-bike-light").click();
      cy.get(".shopping_cart_link").click();
      cy.get(".shopping_cart_link").should("contain", "2");
      cy.get(".inventory_item_name").as("cartItems");
      cy.get("@cartItems").each(($el,index,$list)=>{
        cy.log($el.text());
      });
      cy.get(".inventory_item_name").then($items => {
        const itemNames = [...$items].map(el => el.innerText);
        expect(itemNames).to.include("Sauce Labs Backpack");
        expect(itemNames).to.include("Sauce Labs Bike Light");
      });
    });

    it("confirming the price of the product inside cart"  , () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce"); 
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get("#add-to-cart-sauce-labs-backpack").click()
      cy.get("#add-to-cart-sauce-labs-bike-light").click();
      cy.get(".shopping_cart_link").click();
      cy.get(".shopping_cart_link").should("contain", "2");
      cy.get(".inventory_item_price").as("itemPrice");
      cy.get("@itemPrice").each(($el , index , $list) => {
        cy.log($el.text());
      })
      cy.get(".inventory_item_price").then($items => {
        const itemPrice = [...$items].map(el =>el.innerText)
      
        expect(itemPrice).to.include("$29.99")
        expect(itemPrice).to.include("$9.99")
      })
    })
it("checkout workflow "  , () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce"); 
      cy.get("#login-button").click();
      cy.url().should("include" , "inventory.html");
      cy.get("#add-to-cart-sauce-labs-backpack").click();
      cy.get("#add-to-cart-sauce-labs-bike-light").click();
      cy.get(".shopping_cart_link").click();
      cy.get("#checkout").click();
      cy.get('[data-test="firstName"]').type("ola");
      cy.get('[data-test="lastName"]').type("ade");
      cy.get('[data-test="postalCode"]').type("23456");
      cy.get("#continue").click();

      // getting the item prices
      cy.get(".inventory_item_price").then($prices =>{
      const priceList = [...$prices].map(el => Number(el.innerText.replace("$", "")));

      // calculate the expected subtotal
      const expectedSubtotal = priceList.reduce((a,b) => a + b, 0);
       
      // read tax shown on page.
      cy.get(".summary_tax_label").then($tax =>{
      const tax = Number($tax.text().replace("Tax: $", ""));  
       
      // expected total = subtotal + tax
      const expectedTotal = Number((expectedSubtotal + tax).toFixed(2));

      // assert that the subtotal matches the UI
      cy.get(".summary_total_label").then($total => {
        const uiTotal = Number($total.text().replace("Total: $",""));
        expect(uiTotal).to.equal(expectedTotal);

        cy.get("#finish").click();
      });
      });
      });
});

});