
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PatientJourneyStep } from '@/types/agents';
import { FileUploadSection } from './FileUploadSection';

interface PatientJourneyFormProps {
  patientJourney: PatientJourneyStep[];
  onStepChange: (stepId: string, field: string, value: string) => void;
  onExpansaoMessageChange: (stepId: string, messageIndex: number, field: string, value: string) => void;
  onStepFileUpload: (stepId: string, files: FileList | null) => void;
  onStepFileRemove: (stepId: string, fileIndex: number) => void;
  onExpansaoMessageFileUpload: (stepId: string, messageIndex: number, files: FileList | null) => void;
  onExpansaoMessageFileRemove: (stepId: string, messageIndex: number, fileIndex: number) => void;
}

export function PatientJourneyForm({
  patientJourney,
  onStepChange,
  onExpansaoMessageChange,
  onStepFileUpload,
  onStepFileRemove,
  onExpansaoMessageFileUpload,
  onExpansaoMessageFileRemove,
}: PatientJourneyFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Configure as mensagens que serão enviadas em cada etapa da jornada do paciente:
      </div>

      {patientJourney.map((step, index) => (
        <Card key={step.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                {index + 1}
              </span>
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step.title === 'Expansão' && step.messages ? (
              <div className="space-y-6">
                {step.messages.map((message, msgIndex) => (
                  <div key={msgIndex} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">Mensagem {msgIndex + 1}</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`subject-${step.id}-${msgIndex}`}>Assunto</Label>
                        <Input
                          id={`subject-${step.id}-${msgIndex}`}
                          value={message.subject}
                          onChange={e => onExpansaoMessageChange(step.id, msgIndex, 'subject', e.target.value)}
                          placeholder="Digite o assunto desta mensagem"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${step.id}-${msgIndex}`}>Mensagem</Label>
                        <Textarea
                          id={`description-${step.id}-${msgIndex}`}
                          value={message.description}
                          onChange={(e) => onExpansaoMessageChange(step.id, msgIndex, 'description', e.target.value)}
                          placeholder={`Descreva a mensagem ${msgIndex + 1}...`}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="w-32">
                          <Label htmlFor={`delayValue-${step.id}-${msgIndex}`}>Tempo de espera</Label>
                          <Input
                            id={`delayValue-${step.id}-${msgIndex}`}
                            type="number"
                            min={0}
                            value={message.delayValue}
                            onChange={e => onExpansaoMessageChange(step.id, msgIndex, 'delayValue', e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="w-32">
                          <Label htmlFor={`delayUnit-${step.id}-${msgIndex}`}>Unidade</Label>
                          <Select
                            value={message.delayUnit}
                            onValueChange={value => onExpansaoMessageChange(step.id, msgIndex, 'delayUnit', value)}
                          >
                            <SelectTrigger id={`delayUnit-${step.id}-${msgIndex}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minutos">Minutos</SelectItem>
                              <SelectItem value="horas">Horas</SelectItem>
                              <SelectItem value="dias">Dias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <FileUploadSection
                        label="Upload de Arquivos para esta Mensagem"
                        files={message.files || []}
                        onFileUpload={(files) => onExpansaoMessageFileUpload(step.id, msgIndex, files)}
                        onFileRemove={(fileIndex) => onExpansaoMessageFileRemove(step.id, msgIndex, fileIndex)}
                        id={`message-file-upload-${step.id}-${msgIndex}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor={`subject-${step.id}`}>Assunto</Label>
                  <Input
                    id={`subject-${step.id}`}
                    value={step.subject || ''}
                    onChange={e => onStepChange(step.id, 'subject', e.target.value)}
                    placeholder="Digite o assunto desta etapa"
                  />
                </div>
                <Textarea
                  value={step.description}
                  onChange={(e) => onStepChange(step.id, 'description', e.target.value)}
                  placeholder={`Descreva a mensagem para a etapa ${step.title}...`}
                  rows={3}
                />
                <div className="flex gap-2 items-end">
                  <div className="w-32">
                    <Label htmlFor={`delayValue-${step.id}`}>Tempo de espera</Label>
                    <Input
                      id={`delayValue-${step.id}`}
                      type="number"
                      min={0}
                      value={step.delayValue || ''}
                      onChange={e => onStepChange(step.id, 'delayValue', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="w-32">
                    <Label htmlFor={`delayUnit-${step.id}`}>Unidade</Label>
                    <Select
                      value={step.delayUnit || 'minutos'}
                      onValueChange={value => onStepChange(step.id, 'delayUnit', value)}
                    >
                      <SelectTrigger id={`delayUnit-${step.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutos">Minutos</SelectItem>
                        <SelectItem value="horas">Horas</SelectItem>
                        <SelectItem value="dias">Dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <FileUploadSection
                  label="Upload de Arquivos para esta Etapa"
                  files={step.files || []}
                  onFileUpload={(files) => onStepFileUpload(step.id, files)}
                  onFileRemove={(fileIndex) => onStepFileRemove(step.id, fileIndex)}
                  id={`step-file-upload-${step.id}`}
                />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
