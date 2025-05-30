import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';

const mockImports = [
  { title: 'Importação Maio', date: '30/05/2025', fileCount: 120, importedCount: 118, status: 'Importado' },
  { title: 'Leads Odonto', date: '28/05/2025', fileCount: 80, importedCount: 80, status: 'Importado' },
  { title: 'Agendamentos Junho', date: '27/05/2025', fileCount: 50, importedCount: 0, status: 'Pendente' },
  { title: 'Campanha WhatsApp', date: '25/05/2025', fileCount: 200, importedCount: 200, status: 'Importado' },
  { title: 'Leads Perdidos', date: '20/05/2025', fileCount: 30, importedCount: 28, status: 'Importado' },
  { title: 'Newsletter', date: '18/05/2025', fileCount: 60, importedCount: 60, status: 'Importado' },
  { title: 'Promoção Abril', date: '15/05/2025', fileCount: 90, importedCount: 90, status: 'Importado' },
  { title: 'Clientes VIP', date: '10/05/2025', fileCount: 10, importedCount: 10, status: 'Importado' },
  { title: 'Teste Importação', date: '05/05/2025', fileCount: 5, importedCount: 5, status: 'Importado' },
  { title: 'Base Antiga', date: '01/05/2025', fileCount: 300, importedCount: 295, status: 'Importado' },
  { title: 'Importação Extra', date: '29/04/2025', fileCount: 40, importedCount: 0, status: 'Pendente' },
];

const chatOptions = [
  { value: 'atendimentos', label: 'Atendimentos' },
  { value: 'agendamentos', label: 'Agendamentos' },
  { value: 'finalizados', label: 'Finalizados' },
  { value: 'conversa_ia', label: 'Conversa IA' },
];

const etapasOptions = [
  { value: 'atendimentos', label: 'Atendimentos' },
  { value: 'agendamentos', label: 'Agendamentos' },
  { value: 'assimilacao', label: 'Assimilação' },
  { value: 'utilizacao', label: 'Utilização' },
  { value: 'adocao', label: 'Adoção' },
  { value: 'expansao', label: 'Expansão' },
  { value: 'evangelismo', label: 'Evangelismo' },
  { value: 'perdidos', label: 'Perdidos' },
];

export default function LeadsImportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importName, setImportName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [chat, setChat] = useState('atendimentos');
  const [etapa, setEtapa] = useState('atendimentos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockImports.length / itemsPerPage);
  const paginatedImports = mockImports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Importar Leads</h1>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => setIsModalOpen(true)}>
            <Upload className="w-4 h-4 mr-2" /> Nova Importação
          </Button>
        </div>
        {/* Modal Importação */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>&times;</button>
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Nova Importação</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Importação</label>
                  <Input value={importName} onChange={e => setImportName(e.target.value)} placeholder="Ex: Leads Maio 2025" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo</label>
                  <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chat</label>
                    <Select value={chat} onValueChange={setChat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chatOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Etapa</label>
                    <Select value={etapa} onValueChange={setEtapa}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {etapasOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-2">
                  <Upload className="w-4 h-4 mr-2" /> Carregar Arquivo
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Listagem de importações */}
        <Card className="p-0 overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Título</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Data Importada</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Qtd. no Arquivo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Qtd. Importada</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedImports.map((imp, idx) => (
                <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{imp.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{imp.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{imp.fileCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{imp.importedCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${imp.status === 'Importado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{imp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Paginação moderna */}
          {totalPages > 1 && (
            <div className="flex justify-center my-6">
              <nav className="inline-flex rounded-md shadow-sm bg-white border border-gray-200">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-0 transition-colors duration-150
                      ${currentPage === idx + 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    style={{ minWidth: 40 }}
                  >
                    {idx + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
