"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var register_admin_view_1 = require("./modules/register-admin-view");
var portfolio_1 = require("./plugins/standard/portfolio");
register_admin_view_1.registerAdminView("portfolio", portfolio_1.AdminDashboardPortfolio);
