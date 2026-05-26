---
layout: page
title: "Blog"
permalink: /blog/
description: "Insights on human-centered technology, technical leadership, and modern coaching methodology from 30+ years of building and teaching."
---

# Technical Insights & Human Stories

## Thoughts on Technology, Leadership, and Growth

Sharing lessons learned from 30+ years of building technology for humans, leading development teams, and coaching champions.

---

<div class="blog-posts">
  <% collections.posts.resources.reverse_each do |post| %>
    <article class="blog-post-preview">
      <h3><a href="<%= post.relative_url %>"><%= post.data.title %></a></h3>
      <div class="post-meta">
        <time datetime="<%= post.data.date.strftime('%Y-%m-%d') %>">
          <%= post.data.date.strftime('%B %d, %Y') %>
        </time>
        <% if post.data.categories %>
          <span class="post-categories">
            <% post.data.categories.each do |category| %>
              <span class="category"><%= category %></span>
            <% end %>
          </span>
        <% end %>
      </div>
      <% if post.data.excerpt %>
        <p class="post-excerpt"><%= post.data.excerpt %></p>
      <% end %>
    </article>
  <% end %>
</div>

---

## Topics I Write About

### 🏗️ **Technical Leadership**
Building sustainable engineering cultures, code review practices, and human-centered development processes.

### 🧠 **Software Craftsmanship**
Rails, Elixir, React patterns, architecture decisions, and lessons from production systems.

### 🏐 **Coaching & Development**
Motor learning principles, nonlinear pedagogy, and how sports science applies to software teams.

### 💭 **Philosophy & Culture**
Markets as conversations, privacy-first technology, and the human side of technical work.
