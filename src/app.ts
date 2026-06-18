// Entry point for application setup
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./modules/auth/auth.routes";
import businessRoutes from "./modules/business/business.routes";
import knowledgeBaseRoutes from "./modules/knowledge-base/knowledge-base.routes";
import chatRoutes from "./modules/chat/chat.routes";
import conversationRoutes from "./modules/conversation/conversation.routes";
import whatsappRoutes from "./modules/whatsapp/whatsapp.routes";
import leadRoutes from "./modules/lead/lead.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";


export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/business", businessRoutes);

app.use("/api/v1/knowledge-base", knowledgeBaseRoutes);

app.use("/api/v1/chat", chatRoutes);

app.use("/api/v1/conversations", conversationRoutes);

app.use("/api/v1/whatsapp", whatsappRoutes);

app.use("/api/v1/leads", leadRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);
