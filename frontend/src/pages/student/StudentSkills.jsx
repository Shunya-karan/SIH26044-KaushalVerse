import { useState } from 'react';
import { Code2, Plus, X } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { SkillCard } from '@/components/dashboard';
import { Card, Badge, Button, Modal, Select } from '@/components/ui';
import { studentSkills, skillCategories, allSkills } from '@/data/mockSkills';

export default function StudentSkills() {
  const [skills, setSkills] = useState(studentSkills);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newLevel, setNewLevel] = useState('Beginner');

  const categories = ['All', ...skillCategories];
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  const handleRemove = (skill) => {
    setSkills(skills.filter(s => s.id !== skill.id));
  };

  const handleAdd = () => {
    if (!newSkill) return;
    setSkills([...skills, {
      id: Date.now(),
      name: newSkill,
      category: newCategory,
      proficiency: newLevel === 'Beginner' ? 30 : newLevel === 'Intermediate' ? 60 : 85,
      level: newLevel,
      years: 0,
      verified: false,
    }]);
    setNewSkill('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Skills" subtitle="Manage your technical, soft and tool-based skills" icon={Code2} />

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-primary text-white' : 'bg-white border border-border text-text-secondary hover:bg-bg'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" />Add Skill</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(skill => (
          <SkillCard key={skill.id} skill={skill} showActions onRemove={handleRemove} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-text-secondary">No skills in this category yet.</p>
        </Card>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Skill">
        <div className="space-y-4">
          <div>
            <label className="label">Skill Name</label>
            <input
              className="input"
              placeholder="Select or type a skill"
              list="skill-list"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
            />
            <datalist id="skill-list">
              {allSkills.map(s => <option key={s} value={s} />)}
            </datalist>
          </div>
          <Select label="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
            {skillCategories.map(c => <option key={c}>{c}</option>)}
          </Select>
          <Select label="Proficiency Level" value={newLevel} onChange={e => setNewLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Skill</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
