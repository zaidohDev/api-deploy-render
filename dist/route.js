"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/route.ts
var route_exports = {};
__export(route_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(route_exports);

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prismaClient_default = prismaClient;

// src/service/createCustomerService.ts
var CreateCustomerService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ name, email }) {
      if (!name || !email) {
        throw new Error("Name invalid!");
      }
      return yield prismaClient_default.customer.create({
        data: {
          name,
          email,
          status: true
        }
      });
    });
  }
};

// src/controller/createCustomerController.ts
var CreateCustomerController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const { name, email } = request.body;
      const custumerService = new CreateCustomerService();
      const customer = yield custumerService.execute({ name, email });
      return reply.code(201).send(customer);
    });
  }
};

// src/service/listCustomerService.ts
var ListCustomerService = class {
  execute() {
    return __async(this, null, function* () {
      return yield prismaClient_default.customer.findMany();
    });
  }
};

// src/controller/listCustomerController.ts
var ListCustomerController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const custumerService = new ListCustomerService();
      const customers = yield custumerService.execute();
      return reply.code(200).send(customers);
    });
  }
};

// src/service/deleteCustomerService.ts
var DeleteCustomerService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      const customer = yield prismaClient_default.customer.findFirst({
        where: {
          id
        }
      });
      if (!customer) {
        throw new Error("Id invalid!");
      }
      yield prismaClient_default.customer.delete({
        where: {
          id: customer.id
        }
      });
      return { message: "Customer was removed" };
    });
  }
};

// src/controller/deleteCustomerController.ts
var DeleteCustomerController = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const { id } = request.query;
      const custumerService = new DeleteCustomerService();
      const response = yield custumerService.execute({ id });
      return reply.code(200).send(response);
    });
  }
};

// src/route.ts
function routes(fastify, options) {
  return __async(this, null, function* () {
    fastify.get(
      "/customers",
      (req, reply) => __async(this, null, function* () {
        return new ListCustomerController().handle(req, reply);
      })
    );
    fastify.post(
      "/customer",
      (req, reply) => __async(this, null, function* () {
        return new CreateCustomerController().handle(req, reply);
      })
    );
    fastify.delete(
      "/customer",
      (req, reply) => __async(this, null, function* () {
        return new DeleteCustomerController().handle(req, reply);
      })
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
