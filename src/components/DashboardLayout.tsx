
import React from "react";
import DashboardButton from "./DashboardButton";
import DashboardSection from "./DashboardSection";

const DashboardLayout = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* Main Dashboard Section */}
      <DashboardSection>
        <DashboardButton
          title="Dashboard Principal"
          subtitle="Main Dashboard"
          color="#fff176"
          url="#"
          size="lg"
          className="w-full"
        />
      </DashboardSection>

      {/* Sales and Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <DashboardButton
          title="Vendas"
          subtitle="Sales & Growth"
          color="#69f0ae"
          url="#"
        />
        <div className="col-span-1 md:col-span-2">
          <DashboardButton
            title="Receita"
            subtitle="Revenues/Premium"
            color="#69f0ae"
            url="#"
          />
        </div>
      </div>

      {/* Second Row - Revenue Subsections and Claims */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="col-span-1 md:col-span-1">
          <DashboardButton
            title="Membros"
            subtitle="Members"
            color="#69f0ae"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-1 md:col-span-1">
          <DashboardButton
            title="Ticket Médio"
            subtitle="Av. Ticket"
            color="#69f0ae"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-2 md:col-span-3">
          <DashboardButton
            title="Sinistro"
            subtitle="Claims / Medical Loss"
            color="#ff7373"
            url="#"
            size="sm"
          />
        </div>
      </div>

      {/* Third Row - Claims Subsections */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <DashboardButton
          title="PMPM"
          subtitle="ML per Capita"
          color="#ff7373"
          url="#"
          size="sm"
        />
        <DashboardButton
          title="Sinistro %"
          subtitle="MLR"
          color="#ff7373"
          url="#"
          size="sm"
        />
        <DashboardButton
          title="Vida Sinistro"
          subtitle="Claims Life"
          color="#ff7373"
          url="#"
          size="sm"
        />
      </div>

      {/* Financial and Member Journey Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="col-span-1">
          <DashboardButton
            title="Financeiro"
            subtitle="Financials"
            color="#64b5f6"
            url="#"
          />
        </div>
        <div className="col-span-1 md:col-span-3">
          <DashboardButton
            title="Jornada do Membro"
            subtitle="Member Journey"
            color="#64b5f6"
            url="#"
          />
        </div>
      </div>

      {/* Member Journey Subsections */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="col-span-1">
          <DashboardButton
            title="Time de Saúde"
            subtitle="Care Team"
            color="#64b5f6"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-1">
          <DashboardButton
            title="Aplicativo"
            subtitle="App Usage"
            color="#64b5f6"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-1">
          <DashboardButton
            title="Benefícios"
            subtitle="Add Ons"
            color="#64b5f6"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-1">
          <DashboardButton
            title="Atendimento"
            subtitle="Customer Support"
            color="#64b5f6"
            url="#"
            size="sm"
          />
        </div>
        <div className="col-span-1">
          <DashboardButton
            title="Comunicação"
            subtitle="Comms & CRM"
            color="#64b5f6"
            url="#"
            size="sm"
          />
        </div>
      </div>

      {/* Bottom Row - Product, Tech, Legal, People */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardButton
          title="Produto"
          subtitle="Product & App"
          color="#ffab91"
          url="#"
        />
        <DashboardButton
          title="Tech"
          subtitle=""
          color="#ffab91"
          url="#"
        />
        <DashboardButton
          title="Jurídico"
          subtitle="Legal"
          color="#ce93d8"
          url="#"
        />
        <DashboardButton
          title="People"
          subtitle="Pessoas"
          color="#ce93d8"
          url="#"
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
