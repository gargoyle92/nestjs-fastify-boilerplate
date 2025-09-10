# NestJS Fastify Boilerplate

<p align="center">
  <a href="../README.md">🇺🇸 English</a> |
  <a href="README-ko.md">🇰🇷 한국어</a> |
  <a href="README-ja.md">🇯🇵 日本語</a>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.fastify.io/" target="blank"><img src="https://www.fastify.io/img/logos/fastify-black.svg" width="120" alt="Fastify Logo" /></a>
</p>

<p align="center">🚀 NestJSとFastifyで構築されたモダンで高性能なバックエンドAPIボイラープレート</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-11-red" alt="NestJS" />
  <img src="https://img.shields.io/badge/Fastify-5-black" alt="Fastify" />
  <img src="https://img.shields.io/badge/Prisma-6.14-darkblue" alt="Prisma" />
</p>

## 概要

実務ですぐに適用できる`NestJS + Fastify`ベースのAPIボイラープレートです。  
複雑なアーキテクチャよりも、今必要な機能を素早く実装し、後で拡張できる実用的な構造を提供します。

`TypeScript`ベースで型安全性を保証し、`Fastify`で高性能を提供します。  
`Nestia`によって型定義から自動的にAPIドキュメントとクライアントSDKを生成し、フロントエンドとの協業効率を向上させます。  
データベース接続、認証、ログ、テストなどの必須機能がすでに設定されているため、ビジネスロジックの実装にのみ集中できます。

## ✨ 主要機能

**🏗️ NestJS 11 + Fastify 5** - Express比2倍高速な現代的フレームワーク  
**🔒 JWT認証** - ガードと検証を含む完全な認証システム  
**👥 RBACシステム** - ロールベースアクセス制御と権限ガードシステム  
**🗄️ Prisma ORM** - 自動マイグレーション付き型安全データベース操作  
**📚 自動ドキュメント** - Nestiaが型からAPIドキュメント+クライアントSDK生成  
**🛠️ 開発準備完了** - ホットリロード、テスト、リント、Docker設定済み  
**🚀 本番準備完了** - PM2クラスタリング、ログ、ヘルスチェック含む

## 🛠️ 技術スタック

| カテゴリ                   | 技術         | バージョン |
| -------------------------- | ------------ | ---------- |
| **フレームワーク**         | NestJS       | 11.x       |
| **HTTPサーバー**           | Fastify      | 5.x        |
| **言語**                   | TypeScript   | 5.9        |
| **ORM**                    | Prisma       | 6.14       |
| **認証**                   | Passport JWT | 4.x        |
| **検証**                   | Typia        | 9.7        |
| **ドキュメント**           | Nestia       | 7.3        |
| **テスト**                 | Jest         | 30.x       |
| **パッケージマネージャー** | pnpm         | Latest     |

## 🎯 現在サポートしている機能

✅ **認証** - JWT認証、登録/ログイン、bcryptハッシュ化  
✅ **RBACシステム** - ユーザー-ロール-権限モデルを含む完全なロールベースアクセス制御  
✅ **ユーザー管理** - CRUD操作、プロフィール、権限ベースデータフィルタリング  
✅ **APIドキュメント** - 自動生成Swagger UI、型安全エンドポイント  
✅ **データベース** - Prisma設定、マイグレーション、接続管理、シード  
✅ **開発ツール** - ホットリロード、ESLint/Prettier、Jestテスト、Docker

## 🔮 今後のアップデート予定機能

🔄 **高度な認証** - OAuth 2.0、2FA、メール認証、パスワードリセット  
🔄 **ファイル管理** - アップロードサービス、画像処理、クラウドストレージ  
🔄 **リアルタイム機能** - WebSocket、通知、ライブ更新、チャットシステム  
🔄 **データベースプラス** - Redisキャッシュ、全文検索、最適化  
🔄 **監視** - APM、エラー追跡、分析、カスタムメトリクス  
🔄 **DevOps** - CI/CDパイプライン、Kubernetes、自動スケーリング  
🔄 **API拡張** - レート制限、GraphQL、Webhook、バージョン管理  
🔄 **テスト** - E2E設정、カバレッジレポート、パフォーマンステスト

## 📚 ドキュメント

🌐 **[Repository Overview DeepWiki](https://deepwiki.com/gargoyle92/nestjs-fastify-boilerplate)** - DeepWikiで提供するリポジトリ概要  
📋 **[始め方ガイド](getting-started.md)** - 完全なセットアップガイド、詳細なインストールと設定方法  
📋 **[アーキテクチャガイド](architecture.md)** - 詳細なシステムアーキテクチャ、デザインパターン、拡張性の考慮事項

## 🚀 クイックスタート

```bash
git clone https://github.com/your-username/nestjs-fastify-boilerplate.git
cd nestjs-fastify-boilerplate
pnpm install
cp .env.example .env
# 設定に合わせて.envファイルを編集してください
pnpm prisma:generate && pnpm prisma db push
pnpm start:dev
```

APIドキュメントは`http://localhost:3000/swagger`で確認してください。

## 📁 プロジェクト構造

```
src/
├── modules/            # 機能モジュール
│   ├── auth/           # 認証（ログイン、登録、JWT）
│   └── user/           # ユーザー管理（CRUD、プロフィール）
├── shared/             # 共有コンポーネント
│   ├── adapters/       # 外部システム統合
│   │   ├── database/   # Prismaデータベース接続
│   │   ├── jwt/        # JWTトークン処理
│   │   └── passport/   # 認証戦略
│   ├── base/           # 抽象クラスとインターフェース
│   ├── decorators/     # カスタムパラメータデコレータ
│   ├── dto/            # データ転送オブジェクト
│   ├── exceptions/     # カスタム例外クラス
│   ├── filters/        # グローバル例外フィルター
│   ├── guards/         # 認証・認可ガード
│   ├── middleware/     # リクエスト/レスポンスミドルウェア
│   ├── types/          # TypeScriptタイプ定義
│   └── utils/          # ユーティリティ関数とヘルパー
├── main.ts             # アプリケーションエントリーポイント
└── app.module.ts       # ルートアプリケーションモジュール
```

## 🤝 貢献

貢献を歓迎します！貢献ガイドラインをお読みください：

1. **リポジトリをフォーク**
2. **機能ブランチを作成**: `git checkout -b feature/amazing-feature`
3. **変更をコミット**: `git commit -m 'Add amazing feature'`
4. **ブランチにプッシュ**: `git push origin feature/amazing-feature`
5. **プルリクエストを開く**

### 開発ガイドライン

- TypeScriptベストプラクティスに従う
- 新機能のテストを作成
- 必要に応じてドキュメントを更新
- 従来のコミットメッセージに従う
- すべてのCI検査が通ることを確認

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 謝辞

- **NestJSチーム** - 素晴らしいフレームワークの提供
- **Fastifyチーム** - 高性能HTTPサーバーの提供
- **Prismaチーム** - 優秀なORMとツールの提供
- **Nestia貢献者, [@samchon](https://github.com/samchon)** - 型安全なAPI開発のサポート

## 📞 サポートとコミュニティ

- **Issues**: [GitHub Issues](https://github.com/your-username/nestjs-fastify-boilerplate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/nestjs-fastify-boilerplate/discussions)

---
