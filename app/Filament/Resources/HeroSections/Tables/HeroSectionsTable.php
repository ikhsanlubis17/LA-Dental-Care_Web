<?php

namespace App\Filament\Resources\HeroSections\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HeroSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('badge_text')
                    ->searchable(),
                TextColumn::make('headline')
                    ->searchable(),
                TextColumn::make('highlighted_text')
                    ->searchable(),
                ImageColumn::make('image_url'),
                TextColumn::make('doctor_name')
                    ->searchable(),
                TextColumn::make('doctor_title')
                    ->searchable(),
                TextColumn::make('primary_button_text')
                    ->searchable(),
                TextColumn::make('primary_button_link')
                    ->searchable(),
                TextColumn::make('secondary_button_text')
                    ->searchable(),
                TextColumn::make('secondary_button_link')
                    ->searchable(),
                TextColumn::make('stat_1_label')
                    ->searchable(),
                TextColumn::make('stat_1_value')
                    ->searchable(),
                TextColumn::make('stat_2_label')
                    ->searchable(),
                TextColumn::make('stat_2_value')
                    ->searchable(),
                TextColumn::make('stat_3_label')
                    ->searchable(),
                TextColumn::make('stat_3_value')
                    ->searchable(),
                IconColumn::make('is_active')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
