
import React from "react";

interface SolutionTimeSectionProps {
  problemSolution: string;
  setProblemSolution: (value: string) => void;
  totalTime: string;
}

const SolutionTimeSection: React.FC<SolutionTimeSectionProps> = ({
  problemSolution,
  setProblemSolution,
  totalTime
}) => {
  return (
    <section>
      <div className="chip mb-4">Solução e Tempo</div>
      <div className="grid grid-cols-1 gap-x-6">
        <div className="mb-4">
          <label htmlFor="problemSolution" className="block text-sm font-medium mb-1 text-foreground">
            Solução do Problema <span className="text-destructive">*</span>
          </label>
          <textarea
            id="problemSolution"
            value={problemSolution}
            onChange={(e) => setProblemSolution(e.target.value)}
            className="form-input min-h-[80px]"
            placeholder="Descreva a solução aplicada ao problema"
            required
          />
        </div>
        
        {totalTime && (
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
            <p className="font-medium">Tempo total da ocorrência:</p>
            <p className="text-xl font-bold">{totalTime}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionTimeSection;
