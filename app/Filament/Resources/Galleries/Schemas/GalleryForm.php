<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title'),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('image_url')
                    ->image()
                    ->required(),
                Select::make('category')
                    ->options([
            'clinic_room' => 'Clinic room',
            'dental_unit' => 'Dental unit',
            'doctor' => 'Doctor',
            'treatment' => 'Treatment',
            'before_after' => 'Before after',
            'activity' => 'Activity',
        ]),
                TextInput::make('alt_text'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
