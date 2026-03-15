import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Shirt, Scissors, Glasses } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { HairStyle, ShirtStyle, GlassesStyle, HatStyle } from 'react-nice-avatar';

const COLORS = {
  hair: ['#000', '#fff', '#77311D', '#FC909F', '#D2EFF3', '#506AF4', '#F48150'],
  shirt: ['#9287FF', '#6BD9E9', '#FC909F', '#F48150', '#E0DDFF', '#D2EFF3', '#FFEDEF'],
  face: ['#F9C9B6', '#AC6651', '#77311D'],
  bg: ['#E0DDFF', '#D2EFF3', '#FFEDEF', '#FFEBA4', '#506AF4', '#F48150', '#74D153'],
};

export function CustomizePanel() {
  const { avatarConfig, setAvatarConfig, isCustomizePanelOpen, setIsCustomizePanelOpen } = useTheme();

  const updateConfig = (key: keyof typeof avatarConfig, value: any) => {
    setAvatarConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {isCustomizePanelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 origin-bottom-right max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-2 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Customize Avatar</h3>
            <button onClick={() => setIsCustomizePanelOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Face & Background
                </h4>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-2">Face Color</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.face.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateConfig('faceColor', color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          avatarConfig.faceColor === color ? 'border-indigo-600 scale-110' : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-2">Background Color</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.bg.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateConfig('bgColor', color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          avatarConfig.bgColor === color ? 'border-indigo-600 scale-110' : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center">
                  <Scissors className="w-4 h-4 mr-2" /> Hairstyle
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {(['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'] as HairStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateConfig('hairStyle', style)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border-2 transition-all ${
                        avatarConfig.hairStyle === style
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-100 hover:border-indigo-200 text-slate-600'
                      }`}
                    >
                      {style.replace('woman', '')}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-2">Hair Color</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.hair.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateConfig('hairColor', color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          avatarConfig.hairColor === color ? 'border-indigo-600 scale-110' : 'border-slate-200 hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center">
                  <Shirt className="w-4 h-4 mr-2" /> Outfit
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {(['hoody', 'short', 'polo'] as ShirtStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateConfig('shirtStyle', style)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border-2 transition-all ${
                        avatarConfig.shirtStyle === style
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-100 hover:border-indigo-200 text-slate-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-2">Shirt Color</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.shirt.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateConfig('shirtColor', color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          avatarConfig.shirtColor === color ? 'border-indigo-600 scale-110' : 'border-slate-200 hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-3 flex items-center">
                  <Glasses className="w-4 h-4 mr-2" /> Accessories
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {(['none', 'round', 'square'] as GlassesStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateConfig('glassesStyle', style)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border-2 transition-all ${
                        avatarConfig.glassesStyle === style
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-100 hover:border-indigo-200 text-slate-600'
                      }`}
                    >
                      {style === 'none' ? 'No Glasses' : `${style} Glasses`}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['none', 'beanie', 'turban'] as HatStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateConfig('hatStyle', style)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border-2 transition-all ${
                        avatarConfig.hatStyle === style
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-slate-100 hover:border-indigo-200 text-slate-600'
                      }`}
                    >
                      {style === 'none' ? 'No Hat' : style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
  );
}
