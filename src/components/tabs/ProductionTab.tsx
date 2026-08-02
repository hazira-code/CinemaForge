import React from 'react';
import { Briefcase, Users, Camera, DollarSign, Calendar, AlertTriangle, MapPin, Box } from 'lucide-react';
import { MovieProject } from '../../types';

interface ProductionTabProps {
  project: MovieProject;
}

export const ProductionTab: React.FC<ProductionTabProps> = ({ project }) => {
  const { productionPlan } = project;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Line Production & Logistics Plan</h2>
            <p className="text-xs text-slate-400">Crewing, Equipment Rental, Locations, Budgeting & Risk Mitigation</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Estimated Budget</span>
          <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
            {productionPlan.budgetEstimate}
          </span>
        </div>
      </div>

      {/* Crew & Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crew Roster */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Key Crew Requirements
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {productionPlan.crew.map((member, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 font-medium">
                • {member}
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Package */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-400" />
            Camera, Grip & Lighting Package
          </h3>

          <div className="space-y-2">
            {productionPlan.equipment.map((eq, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-blue-300">
                🎥 {eq}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Props & Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Box className="w-4 h-4 text-amber-400" />
            Essential Hero Props
          </h3>

          <div className="space-y-2">
            {productionPlan.props.map((prop, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                📦 {prop}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-400" />
            Location Specs & Stages
          </h3>

          <div className="space-y-2">
            {productionPlan.locations.map((loc, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
                📍 {loc}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule & Risk Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            Production Schedule
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed font-medium p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {productionPlan.schedule}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-2">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Risk Analysis & Safety Contingencies
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed font-medium p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {productionPlan.riskAnalysis}
          </p>
        </div>
      </div>
    </div>
  );
};
