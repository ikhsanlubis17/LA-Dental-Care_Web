<?php

namespace App\Filament\Resources\AdminProfiles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AdminProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('full_name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                Select::make('role')
                    ->options(['super_admin' => 'Super Admin', 'admin' => 'Admin'])
                    ->default('admin')
                    ->required(),
                TextInput::make('avatar_url')
                    ->url(),
            ]);
    }
}
