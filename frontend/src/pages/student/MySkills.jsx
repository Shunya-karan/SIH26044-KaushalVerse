import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge, Modal } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { skillCategories, mockSkillTaxonomy } from '../../data/mockSkills';
import { Plus, Trash2, CheckCircle2, Sparkles, Filter, Layers, Check } from 'lucide-react';
import { toast } from 'sonner';

export const MySkills = () => {
  const { skills, addSkill, removeSkill, updateSkillProficiency } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Intermediate');
  const [newSkillYears, setNewSkillYears] = useState(1);

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const success = addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      years: Number(newSkillYears),
      verified: true,
    });

    if (success) {
      toast.success(`Skill "${newSkillName}" added successfully!`);
      setIsAddModalOpen(false);
      setNewSkillName('');
    } else {
      toast.error('This skill is already in your profile.');
    }
  };

  const getProficiencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'bg-emerald-50 text-secondary border-emerald-200';
      case 'intermediate':
        return 'bg-primary-soft text-primary border-primary-light';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Skills Inventory"
        subtitle="Manage your technical competencies, hands-on experience, and verification credentials."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'My Skills' }]}
        actions={
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
            Add New Skill
          </Button>
        }
      />

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-4">
        {skillCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface border border-border text-subtext hover:text-main hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-subtle flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-main">{skill.name}</h3>
                  {skill.verified && (
                    <span title="Academically Verified">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-subtext font-medium">{skill.category}</span>
              </div>

              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getProficiencyColor(skill.proficiency)}`}>
                {skill.proficiency}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/70 text-xs">
              <span className="text-subtext">
                Experience: <strong className="text-main">{skill.years} {skill.years === 1 ? 'Year' : 'Years'}</strong>
              </span>

              <div className="flex items-center gap-2">
                <select
                  value={skill.proficiency}
                  onChange={(e) => {
                    updateSkillProficiency(skill.name, e.target.value);
                    toast.success(`Updated ${skill.name} to ${e.target.value}`);
                  }}
                  className="text-[11px] p-1 rounded border border-border bg-slate-50 focus:bg-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <button
                  onClick={() => {
                    removeSkill(skill.name);
                    toast.info(`Removed ${skill.name}`);
                  }}
                  className="p-1 rounded text-muted hover:text-error hover:bg-red-50 transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Competency to Profile">
        <form onSubmit={handleAddSkill} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-main mb-1">Skill or Tool Name</label>
            <input
              required
              type="text"
              placeholder="e.g. TypeScript, Redis, Fastify, Docker"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-main mb-1">Category</label>
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
              >
                {skillCategories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-main mb-1">Proficiency Level</label>
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Years of Practical Experience</label>
            <input
              type="number"
              min="0.5"
              max="10"
              step="0.5"
              value={newSkillYears}
              onChange={(e) => setNewSkillYears(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add to Skills
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
