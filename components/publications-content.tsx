"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, Clock } from "lucide-react"
import Link from "next/link"

// Mock data - can be replaced with real CMS
const articles: any[] = []

export function PublicationsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", "Marchés", "Macro", "Carrière", "Analyse", "Club"]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main>
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 text-balance">Publications</h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            Analyses de marchés, veille économique et insights sur les métiers de la finance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30 sticky top-20 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="border-border hover:border-foreground/20 transition-colors group">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="px-2 py-1 bg-accent/10 text-accent-foreground font-medium rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors text-balance">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-pretty">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{article.date}</span>
                      <span>{article.author}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href={`/publications/${article.id}`}>Lire l'article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="pt-12 pb-12 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">Aucun article trouvé</h3>
                <p className="text-muted-foreground">Essayez de modifier vos critères de recherche.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
