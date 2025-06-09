
import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ConfiguracoesImagemProps {
  previewImagem: string;
  onImagemUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConfiguracoesImagem = ({
  previewImagem,
  onImagemUpload
}: ConfiguracoesImagemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5 text-green-500" />
          <span>Imagem Padrão para Felicitações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="imagem">
            Selecionar nova imagem
          </Label>
          <div className="mt-2">
            <div className="flex items-center space-x-4">
              <input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={onImagemUpload}
                className="hidden"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => document.getElementById('imagem')?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Escolher Imagem</span>
              </Button>
            </div>
          </div>
        </div>

        {previewImagem && (
          <div className="mt-4">
            <Label>Preview da imagem:</Label>
            <div className="mt-2 max-w-xs">
              <img 
                src={previewImagem} 
                alt="Preview da imagem de felicitação"
                className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfiguracoesImagem;
