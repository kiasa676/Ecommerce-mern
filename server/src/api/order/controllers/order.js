"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async customOrderController(ctx) {
    try {
      const entry = await strapi.entityService.findMany(
        "api::product.product",

        {
          fields: ["title"],
          limit: 4,
        }
      );
      return entry;
    } catch (err) {
      ctx.body = err;
    }
  },

  async create(ctx) {
    try {
      // Ensure that ctx.request.body and ctx.request.body.products exist
      // @ts-ignore
      const { body } = ctx.request;
      if (!body || !body.products) {
        ctx.response.status = 400; // Bad Request
        return { error: "Missing 'products' property in the request body." };
      }

      const { products } = body;
      const line_items = await Promise.all(
        products.map(async (product) => {
          const image = product.image;
          const productentity = await strapi.entityService.findMany(
            "api::product.product",
            {
              filters: {
                key: product.key,
              },
            }
          );

          const realProduct = productentity[0];

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: realProduct.title,
                images: [image],
              },
              unit_amount: realProduct.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        line_items: line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/payment/failed`,
      });

      await strapi.entityService.create("api::order.order", {
        data: {
          products,
          stripeId: session.id,
        },
      });
      return { stripeId: session.id };
    } catch (error) {
      console.error(error);
      ctx.response.status = 500;
      return error;
    }
  },
}));
