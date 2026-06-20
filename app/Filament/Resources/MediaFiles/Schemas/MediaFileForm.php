<?php

namespace App\Filament\Resources\MediaFiles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MediaFileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('file_name')
                    ->required(),
                TextInput::make('file_url')
                    ->url()
                    ->required(),
                TextInput::make('file_type'),
                TextInput::make('file_size')
                    ->numeric(),
                TextInput::make('alt_text'),
                TextInput::make('folder'),
                TextInput::make('uploaded_by')
                    ->numeric(),
            ]);
    }
}
